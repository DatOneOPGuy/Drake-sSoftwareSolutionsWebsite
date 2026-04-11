declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
declare module '*.css';
declare module '*.mp4' {
  const src: string;
  export default src;
}