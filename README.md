# MongoDB Setup

## Prerequisite
Set AWS and Mongo env variables in auth.env:

```
AWS_ACCESS_KEY_ID=abc
AWS_SECRET_ACCESS_KEY=abc
TF_VAR_mongo_user=admin
TF_VAR_mongo_password=password
```

## Create resources
`make build`

## Destory resources
`make destroy`

## Provision resources
`make GCP_SSH_KEY=~/.ssh/google_compute_engine provision`

## All in one ! :)
`make GCP_SSH_KEY=~/.ssh/google_compute_engine all`

## Common errors
- `Error: Resource already managed by Terraform. Terraform is already managing a remote object for google_compute_subnetwork.default.`
  - Remove subnetwork from terraform state: `docker-compose exec terransible terraform state rm google_compute_subnetwork.default`

## Check if it works:
- add your IP to the VPC-firewall
- connect via mongo commandline `mongo mongodb://root:pass@sandbox-mongo-01.hellolucy.io,sandbox-mongo-02.hellolucy.io,sandbox-mongo-03.hellolucy.io/admin?replicaSet=sandbox-cluster`

## Changing replica name
You must do int in 2 places:
- `terraform/replica_init.cfg`
- `ansible/mongod.conf`

## Resync replica
`ansible-playbook -i ./resync/inventory --private-key ${GCP_SSH_KEY} ./resync/automatic_member_sync.yaml`

## PROTIP:

Alias `dc` like so `alias dc="docker-compose"`

Check if your working directory is mounted properly:

1) `docker-compose exec terransible ls`
2) `docker-compose exec terransible cat auth.env`
3) change `auth.env` on your local editor
4) `docker-compose exec terransible cat auth.env` to see reflected changes in realtime
5) Check your ENV's `docker-compose exec terransible printenv` 

## Interesting links
- https://docs.mongodb.com/v3.4/tutorial/deploy-replica-set-with-keyfile-access-control/
- https://github.com/scarolan/ansible-terraform
- https://github.com/ansible/ansible-examples/tree/master/mongodb
- https://github.com/UnderGreen/ansible-role-mongodb

