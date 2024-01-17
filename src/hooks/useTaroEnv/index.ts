export const useTaroEnv = (name?: string) => {
  return name ? process.env.TARO_ENV === name : process.env.TARO_ENV;
};
