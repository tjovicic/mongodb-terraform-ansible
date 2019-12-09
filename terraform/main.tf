provider "google" {
  credentials = "${file("credentials.json")}"
  project     = "${var.project_name}"
  region      = "${var.region}"
}

resource "google_compute_subnetwork" "default" {
  # These are dummmy values, please import this resource before applying  
  network = "default"
  name = "default"
  ip_cidr_range = "10.0.1.0/20"

  # Prevents someone accidentaly destorying default subnet
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}

resource "google_compute_firewall" "default" {
  name          = "${var.prefix}-db"
  network       = "${var.network}"

  allow {
    protocol    = "tcp"
    ports       = ["27017"]
  }

  source_ranges = ["${google_compute_subnetwork.default.ip_cidr_range}"]
}

resource "google_compute_address" "internal" {
  count        = "${length(var.count_index)}"
  name         = "${var.prefix}-dev-${var.count_index[count.index]}-internal-ip"
  address_type = "INTERNAL"
}

resource "google_compute_address" "external" {
  count        = "${length(var.count_index)}"
  name         = "${var.prefix}-dev-${var.count_index[count.index]}-external-ip"
  address_type = "EXTERNAL"
}

resource "google_compute_instance" "default" {
  count            = "${length(var.count_index)}"
  name             = "${var.prefix}-${var.count_index[count.index]}"
  machine_type     = "${var.instance_type}"
  zone             = "${var.region}-${var.zones[count.index]}"

  boot_disk {
    initialize_params {
      image        = "ubuntu-os-cloud/ubuntu-1604-lts"
    }
  }

  network_interface {
    network        = "${var.network}"
    network_ip     = "${google_compute_address.internal.*.address[count.index]}"
    access_config {
      nat_ip       = "${google_compute_address.external.*.address[count.index]}"
    }
  }

  lifecycle {
    ignore_changes = ["attached_disk"]
  }
}

resource "google_compute_disk" "default" {
  count = "${length(var.count_index)}"
  name = "${var.prefix}-db-${var.count_index[count.index]}"
  size = "32"
  type = "pd-ssd"
  zone = "${var.region}-${var.zones[count.index]}"
}

resource "google_compute_attached_disk" "default" {
  count = "${length(var.count_index)}"
  disk = "${google_compute_disk.default.*.self_link[count.index]}"
  instance = "${google_compute_instance.default.*.self_link[count.index]}"
}

provider "aws" {
  region  = "${var.aws_region}"
}

resource "aws_route53_record" "default" {
  count   = "${length(var.count_index)}"
  zone_id = "${var.route53_zone_id}"
  name    = "${google_compute_instance.default[count.index].name}.${var.route53_zone_name}"
  type    = "A"
  ttl     = "300"
  records = ["${google_compute_instance.default[count.index].network_interface.0.access_config.0.nat_ip}"]
}

resource "local_file" "inventory" {
  content       = "${templatefile("inventory.cfg", {
    zone_name   = var.route53_zone_name, 
    primary     = google_compute_instance.default[0], 
    secondaries = slice(google_compute_instance.default, 1, length(google_compute_instance.default))
    })
  }"
  filename      = "${path.module}/../ansible/inventory"
}

resource "local_file" "replica_init" {
  content   = "${templatefile("replica_init.cfg", {
    primary = google_compute_instance.default[0].network_interface[0].network_ip
    })
  }"
  filename      = "${path.module}/../ansible/files/replica_init.sh"
}

resource "local_file" "replica_admin_create" {
  content    = "${templatefile("replica_admin_create.cfg", {
    user     = var.mongo_user
    password = var.mongo_password
    })
  }"
  filename      = "${path.module}/../ansible/files/replica_admin_create.sh"
}

resource "local_file" "replica_add_second_host" {
  content    = "${templatefile("replica_add_second_host.cfg", {
    user     = var.mongo_user
    password = var.mongo_password
    second   = google_compute_instance.default[1].network_interface[0].network_ip
    })
  }"
  filename      = "${path.module}/../ansible/files/replica_add_second_host.sh"
}

resource "local_file" "replica_add_third_host" {
  content    = "${templatefile("replica_add_third_host.cfg", {
    user     = var.mongo_user
    password = var.mongo_password
    third   = google_compute_instance.default[2].network_interface[0].network_ip
    })
  }"
  filename      = "${path.module}/../ansible/files/replica_add_third_host.sh"
}

resource "local_file" "replica_secondaries_reconfigure" {
  content    = "${templatefile("replica_secondaries_reconfigure.cfg", {
    user     = var.mongo_user
    password = var.mongo_password
    })
  }"
  filename      = "${path.module}/../ansible/files/replica_secondaries_reconfigure.sh"
}
