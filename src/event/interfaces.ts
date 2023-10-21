export interface CallbackInfo {
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
  timeout: NodeJS.Timeout
}