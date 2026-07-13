exports.up = (pgm) => {
  pgm.createTable("uploads", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },

    file_name: {
      type: "text",
      notNull: true,
    },

    s3_key: {
      type: "text",
      notNull: true,
      unique: true,
    },

    s3_url: {
      type: "text",
      notNull: true,
    },

    content_type: {
      type: "text",
      notNull: true,
    },

    file_size: {
      type: "bigint",
      notNull: true,
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("uploads");
};