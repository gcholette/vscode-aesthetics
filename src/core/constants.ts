const app_prefix = "[VS Code Aesthetics]"

export const msgs = {
  enable_all: `${app_prefix} Enable All activated.`,
  enable_glow: `${app_prefix} Enable Glow activated.`,
  success_inject: `${app_prefix} Aesthetics succesfully added, reload VS Code to take effect.`,
  error_inject: `${app_prefix} An error occured, could not add files.`,

  debug: (x: string) => `${app_prefix} [DEBUG] ${x}`,
}
