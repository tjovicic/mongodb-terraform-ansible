### Prerequisites
Stop all writes to the collections

### Run
`make GCP_SSH_KEY=~/.ssh/google_compute_engine USERNAME=$mongo_admin PASSWORD=$mongo_admin_password DATABASE=$mongo_database \
INDEX_BUILD_SCRIPT_PATH=$path_to_index_build_script run`

Example:

`make GCP_SSH_KEY=~/.ssh/google_compute_engine USERNAME=admin PASSWORD=password DATABASE=sandbox \
INDEX_BUILD_SCRIPT_PATH=/home/june.db.js run`

### Generate fake data
`python3 fake-data-generator/generate.py`