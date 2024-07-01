export interface Alert {
  /** 
   * @title text
   * @format rich-text 
   */
  text: string;
}

function Alert({ text }: Alert) {
  return (
    <div
      class="bg-black group-has-[#menu:checked]/header:bg-black group-has-[li:hover]/header:bg-black group-has-[#header-transparent:checked]/header:bg-transparent w-full h-8"
      id="alert"
    >
      <div class="py-2" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default Alert;
