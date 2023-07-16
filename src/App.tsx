import Form from "./components/Form.tsx";

interface DropDown {
  options: string[];
}

function App() {
  const dropDownYT: DropDown[] = [
    { options: ["MP4", "MP3"] },
    { options: ["Best available quality", "FullHD if available", "720p", "480", "Shit quality"] },
  ];
  return (
    <div>
      <img className={"main-logo"} src={"../public/logo.svg"} alt={"logo"}/>
      <div className={"container"}></div>
        <div className={"main-container"}>
            <div className={"youtube-downloader hover-card"}>
                <Form name={"YouTube Downloader"} onSubmit={() => null} inputName={"Download any video from YouTube using a link with the best quality"} inputPlaceholder={"Link https://yout..."} buttonName={"Download"} dropdowns={dropDownYT}></Form>
            </div>
        </div>
    </div>
  )
}

export default App
