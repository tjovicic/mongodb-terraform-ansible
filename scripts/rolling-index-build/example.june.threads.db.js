db.threads.ensureIndex({ "_id": 1},{name: "_id_"})
db.threads.ensureIndex({ "id": "hashed"},{name: "id_hashed"})
db.threads.ensureIndex({ "category_ids": 1},{name: "category_ids_1"})
db.threads.ensureIndex({ "last_message_timestamp": -1},{name: "last_message_timestamp_1"})
db.threads.ensureIndex({ "block_id": "hashed"},{name: "block_id_hashed",sparse: true})
db.threads.ensureIndex({ "participants.email": "hashed"},{name: "participants.email_hashed"})
db.threads.ensureIndex({ "section": 1},{name: "section_1"})
db.threads.ensureIndex({ "labels.name": 1, "account_id": 1},{name: "account_id__labels_name"})
db.threads.ensureIndex({ "folders.name": 1, "account_id": 1},{name: "account_id__folders_name"})
db.threads.ensureIndex({ "account_id": 1, "labels.name": 1, "folders.name": 1, "section": 1, "last_message_received_timestamp": -1},{name: "account_labels_folders_section_lmrt",sparse: true})
db.threads.ensureIndex({ "account_id": 1},{name: "account_id_1"})
db.threads.ensureIndex({ "account_id": 1, "section": 1, "sticker": 1, "last_message_received_timestamp": -1},{name: "account_section_sticker"})
db.threads.ensureIndex({ "approved": 1},{name: "approved_1"})
db.threads.ensureIndex({ "fake": 1},{name: "fake_1",sparse: true})
db.threads.ensureIndex({ "inbox": 1},{name: "inbox_1"})
db.threads.ensureIndex({ "all": 1},{name: "all_1"})
db.threads.ensureIndex({ "archive": 1},{name: "archive_1"})
db.threads.ensureIndex({ "important": 1},{name: "important_1"})
db.threads.ensureIndex({ "sent": 1},{name: "sent_1"})
db.threads.ensureIndex({ "spam": 1},{name: "spam_1"})
db.threads.ensureIndex({ "archived": 1},{name: "archived_1"})
db.threads.ensureIndex({ "trash": 1},{name: "trash_1"})
db.threads.ensureIndex({ "category": "hashed"},{name: "category_hashed"})
db.threads.ensureIndex({ "last_message_from.0.email": "hashed"},{name: "last_message_from.0.email_hashed"})
db.threads.ensureIndex({ "first_message_timestamp": 1},{name: "first_message_timestamp"})
db.threads.ensureIndex({ "seen": 1},{name: "seen_1"})
db.threads.ensureIndex({ "last_message_received_timestamp": -1, "account_id": 1, "inbox": 1, "spam": 1, "approved": 1, "first_message_timestamp": -1, "category_ids": 1, "last_message_timestamp": -1, "category": 1, "trash": 1, "unread": 1, "section": 1, "seen": 1},{name: "convos_optimized"})
db.threads.ensureIndex({ "cleared_at": -1},{name: "cleared_at_-1"})
db.threads.ensureIndex({ "last_message_from.email": 1},{name: "last_message_from.email_1"})
db.threads.ensureIndex({ "deleted_at": -1},{name: "deleted_at"})
db.threads.ensureIndex({ "has_attachments": 1},{name: "has_attachments_1"})
db.threads.ensureIndex({ "template": 1},{name: "template"})
db.threads.ensureIndex({ "last_message_received_timestamp": -1, "spam": 1, "account_id": 1, "category_ids": 1, "approved": 1, "first_message_timestamp": -1, "last_message_timestamp": -1, "category": 1, "trash": 1, "archived": 1, "inbox": -1, "cleared_at": 1},{name: "feed_optimized"})
db.threads.ensureIndex({ "snoozed_at": -1},{name: "snoozed_at"})
db.threads.ensureIndex({ "section": 1, "category": 1, "starred": -1, "last_message_received_timestamp": -1},{name: "pinned-convos-optimized"})
db.threads.ensureIndex({ "last_message_received_timestamp": -1},{name: "last_message_received_timestamp_1"})
db.threads.ensureIndex({ "last_message_sent_timestamp": -1},{name: "last_message_sent_timestamp_-1"})
db.threads.ensureIndex({ "last_snoozed_at": -1},{name: "last_snoozed_at_-1"})
db.threads.ensureIndex({ "labels.id": 1},{name: "labels.id_1"})
db.threads.ensureIndex({ "folders.id": 1},{name: "folders.id_1"})
db.threads.ensureIndex({ "labels.display_name": 1},{name: "labels.display_name_1"})
db.threads.ensureIndex({ "folders.display_name": 1},{name: "folders.display_name_1"})
db.threads.ensureIndex({ "_sort_snoozed_at__last_message_received_timestamp": -1},{name: "_sort_snoozed_at__last_message_received_timestamp_-1"})
db.threads.ensureIndex({ "_sort_snoozed_at__last_message_timestamp": -1},{name: "_sort_snoozed_at__last_message_timestamp_-1"})
db.threads.ensureIndex({ "spam": 1, "trash": 1, "deleted_at": 1, "account_id": 1, "last_message_received_timestamp": -1},{name: "all-mail"})
db.threads.ensureIndex({ "spam": 1, "sent": -1, "section": 1, "category": 1, "account_id": 1, "deleted_at": 1, "last_message_sent_timestamp": -1},{name: "sent-convos-optimized"})
db.threads.ensureIndex({ "section": 1, "category": 1, "spam": 1, "inbox": -1, "approved": -1, "cleared_at": 1, "account_id": 1, "deleted_at": -1, "last_snoozed_at": -1, "last_message_received_timestamp": -1},{name: "recent-convos-optimized"})
db.threads.ensureIndex({ "spam": 1, "approved": 1, "section": 1, "archived": 1, "inbox": 1, "category": 1, "cleared_at": 1, "account_id": 1, "deleted_at": 1, "last_message_timestamp": -1},{name: "recent-feed-optimized"})
db.threads.ensureIndex({ "starred": 1, "spam": -1, "section": 1, "category": 1, "account_id": 1, "deleted_at": -1, "last_message_received_timestamp": -1},{name: "starred_convos_optimzied"})
db.threads.ensureIndex({ "approved": 1, "spam": 1, "section": 1, "category": 1, "cleared_at": -1, "account_id": 1, "last_message_timestamp": -1, "deleted_at": 1},{name: "cleared-feed-optimized"})
db.threads.ensureIndex({ "trash": 1, "spam": 1, "account_id": 1, "deleted_at": 1, "snoozed_at": -1},{name: "snoozed-optimized"})
db.threads.ensureIndex({ "section": 1, "category": 1, "trash": 1, "spam": 1, "cleared_at": 1, "approved": -1, "account_id": 1, "deleted_at": -1, "last_message_received_timestamp": -1},{name: "cleared-convos-optimized"})
db.threads.ensureIndex({ "unread": -1, "spam": 1, "archived": 1, "inbox": -1, "approved": -1, "category": 1, "section": 1, "account_id": 1, "cleared_at": -1, "deleted_at": -1, "last_message_timestamp": -1},{name: "unread-feed-optimized"})
db.threads.ensureIndex({ "unread": -1, "spam": 1, "inbox": -1, "approved": -1, "section": 1, "category": 1, "account_id": 1, "deleted_at": -1, "cleared_at": -1, "last_message_received_timestamp": -1},{name: "unread-convos-optimized"})
db.threads.ensureIndex({ "approved": -1, "starred": -1, "spam": 1, "section": 1, "category": 1, "account_id": 1, "cleared_at": -1, "deleted_at": -1, "last_message_timestamp": -1},{name: "feed-pinned-optimized"})
db.threads.ensureIndex({ "spam": 1, "inbox": -1, "approved": -1, "archived": 1, "category": 1, "cleared_at": 1, "section": 1, "account_id": 1, "deleted_at": -1, "last_message_timestamp": -1},{name: "single_category_view_not_cleared"})
db.threads.ensureIndex({ "spam": 1, "approved": -1, "section": 1, "category": 1, "account_id": 1, "last_message_timestamp": -1},{name: "feed-single-category-view-show-all"})
db.threads.ensureIndex({ "spam": 1, "approved": 1, "section": 1, "archived": 1, "inbox": 1, "trash": 1, "category": 1, "cleared_at": 1, "account_id": 1, "deleted_at": 1, "last_message_timestamp": -1},{name: "recent-feed-optimization"})
