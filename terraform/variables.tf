variable "prefix" {
  default = "test-sandbox-mongo"
}

variable "project_name" {
  default = "lucy-sandbox"
}

variable "count_index" {
  default = {
    "0" = "01"
    "1" = "02"
    "2" = "03"
  }
}

variable "region" {
  default = "us-east1"
}

variable "aws_region" {
  default = "us-east-1"
}

variable "zones" {
  default = {
    "0" = "b"
    "1" = "c"
    "2" = "d"
  }
}

variable "instance_type" {
  default = "n1-standard-1"
}

variable "network" {
  default = "default"
}

variable "route53_zone_name" {
  default = "elly.ai"
}

variable "route53_zone_id" {
  default = "Z2S4BDD03WFALM"
}

# Intentionally left blank, will be imported from the environment vars
variable "mongo_user" {
  type = string
}


# Intentionally left blank, will be imported from the environment var
variable "mongo_password" {
  type = string
}
