module.exports = {
  apps : [{
    name   : "azure-gpt-api",
    script: 'dist/',
    watch: true,
    watch_delay: 1000,
    watch : "dist",
    // ignore_watch : ["node_modules"],
    exec_mode: "cluster",
    instances: 4,
    max_memory_restart: "1G",
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
  }]
};