TERRA = docker run -it --env-file auth.env -w /work/terraform -v $(shell pwd):/work hashicorp/terraform:light

all: build provision

check-credentials:
	@if [[ ! -f "./terraform/credentials.json" ]]; then \
		echo "credentials.json must be present in terraform dir"; exit 1; \
	fi

build: check-credentials
	@if [[ ! -f "./auth.env" ]]; then \
		echo "auth.env must be present in root dir. See example.env"; exit 1; \
	fi

	$(TERRA) init
	$(TERRA) import google_compute_subnetwork.default default 	
	$(TERRA) validate 
	$(TERRA) plan 
	$(TERRA) apply -auto-approve

destroy: check-credentials
	$(TERRA) state rm google_compute_subnetwork.default
	$(TERRA) destroy -auto-approve

provision:
	openssl rand -base64 741 > ./ansible/keyfile

	ansible-playbook -i ./ansible/inventory --private-key ${GCP_SSH_KEY} ./ansible/mongo_init.yml

	ansible-playbook -i ./ansible/inventory --private-key ${GCP_SSH_KEY} ./ansible/replica_set_init.yml

import-network:
	$(TERRA) import google_compute_subnetwork.default default

plan:
	$(TERRA) init
	$(TERRA) validate
	$(TERRA) plan

plan-out:
	$(TERRA) init
	$(TERRA) validate
	$(TERRA) plan --out create.plan

apply:
	$(TERRA) init
	$(TERRA) validate
	$(TERRA) apply

apply-plan:
	$(TERRA) init
	$(TERRA) validate
	$(TERRA) apply "create.plan"

show:
	$(TERRA) show

check-inventory:
	(cat terraform/inventory)

ping:
	ansible -m ping -i terraform/inventory primary --private-key=~/.ssh/google_compute_engine
	ansible -m ping -i terraform/inventory secondaries --private-key=~/.ssh/google_compute_engine

play:
	./ansible-run.sh ~/.ssh/google_compute_engine
