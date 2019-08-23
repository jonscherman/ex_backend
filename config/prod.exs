use Mix.Config

# For production, we often load configuration from external
# sources, such as your system environment. For this reason,
# you won't find the :http configuration below, but set inside
# ExBackendWeb.Endpoint.init/2 when load_from_system_env is
# true. Any dynamic configuration should be done there.
#
# Don't forget to configure the url host to something meaningful,
# Phoenix uses this information when generating URLs.
#
# Finally, we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the mix phx.digest task
# which you typically run after static files are built.
config :ex_backend, ExBackendWeb.Endpoint,
  load_from_system_env: true,
  url: [host: "backend.media-io.com", port: 443],
  root: ".",
  cache_static_manifest: "priv/static/cache_manifest.json"

# Do not print debug messages in production
config :logger, level: :info

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :ex_backend, ExBackendWeb.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [:inet6,
#               port: 443,
#               keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#               certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables return an absolute path to
# the key and cert in disk or a relative path inside priv,
# for example "priv/ssl/server.key".
#
# We also recommend setting `force_ssl`, ensuring no data is
# ever sent via http, always redirecting to https:
#
#     config :ex_backend, ExBackendWeb.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :ex_backend, ExBackendWeb.Endpoint, server: true
#

config :ex_backend, ExBackendWeb.Endpoint,
  secret_key_base: "WzHyGzHsy0VflZcAynNf3xwUbUBzw3m7BkaiuiVpD0qofv0r8+BlXDJzadh+NTLN"

config :logger, level: :debug

config :httpotion, :default_timeout, 60000

# Configure your database
config :ex_backend, ExBackend.Repo,
  migration_timestamps: [type: :naive_datetime_usec],
  username: "postgres",
  password: "postgres",
  database: "ex_backend_prod",
  hostname: "database",
  pool_size: 10

config :ex_backend, ExBackend.Mailer,
  adapter: Bamboo.SendGridAdapter,
  api_key: {:system, "SENDGRID_API_KEY"}

config :ex_backend,
  app_name: "Subtil",
  hostname: "backend.media-io.com",
  port: 443,
  ssl: true,
  akamai_hostname: "akamai.com",
  akamai_username: "akamai_username",
  akamai_password: "akamai_password",
  akamai_video_prefix: "/421959/prod/innovation/SubTil",
  appdir: "/opt/app",
  acs_app: "./SynchroSubtilTSP_V0.6"

config :ex_video_factory,
  mode: :custom,
  endpoint: {:system, "VIDEO_FACTORY_ENDPOINT"}

config :amqp,
  hostname: "192.168.101.107",
  username: "guest",
  password: "guest",
  virtual_host: ""

# Finally import the config/prod.secret.exs
# which should be versioned separately.
# import_config "prod.secret.exs"
