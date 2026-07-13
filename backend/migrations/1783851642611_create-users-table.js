exports.up = (pgm) => {
  // Enable UUID generation
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });

  // Create users table
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    cognito_sub: {
      type: "text",
      notNull: true,
      unique: true,
    },

    email: {
      type: "text",
      notNull: true,
      unique: true,
    },

    full_name: {
      type: "text",
    },

    role: {
      type: "text",
      notNull: true,
      default: "USER",
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
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};