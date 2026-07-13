exports.up = (pgm) => {
  pgm.createTable("tasks", {
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

    title: {
      type: "varchar(255)",
      notNull: true,
    },

    description: {
      type: "text",
    },

    status: {
      type: "varchar(20)",
      notNull: true,
      default: "TODO",
    },

    priority: {
      type: "varchar(20)",
      notNull: true,
      default: "MEDIUM",
    },

    due_date: {
      type: "timestamp",
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },

    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex("tasks", ["user_id"]);
  pgm.createIndex("tasks", ["status"]);
  pgm.createIndex("tasks", ["priority"]);
};

exports.down = (pgm) => {
  pgm.dropTable("tasks");
};