run:
	ansible-playbook -i ./inventory --private-key ${GCP_SSH_KEY} \
	--extra-vars "username=${USERNAME} password=${PASSWORD} database=${DATABASE} index_build_script_path=${INDEX_BUILD_SCRIPT_PATH}" \
	./playbooks/rolling_index_build.yml
