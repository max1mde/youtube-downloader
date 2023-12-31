import {useState} from "react";

interface DropDown {
    options: string[];
}

interface Props {
    name: string;
    onSubmit: (link: string, mp4: boolean, quality: number) => void;
    inputName: string
    inputPlaceholder: string
    buttonName: string
    dropdowns: DropDown[]
}

function Form({name, onSubmit, inputName, inputPlaceholder, buttonName, dropdowns}: Props) {
    const [link, setLink] = useState("");
    const [mp4, setMp4] = useState(true);
    const [quality, setQuality] = useState(0);

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMp4(event.target.value === "MP4");
    };

    const handleQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuality(event.target.selectedIndex);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (link.trim() !== "") {
            onSubmit(link, mp4, quality);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className={"d-grid gap-2"}>
                    <legend>{name}</legend>
                    <div className="mb-3">
                        <label htmlFor="textInput" className="form-label">{inputName}</label>
                        <input onChange={handleLinkChange} type="text" id="textInput" className="form-control pulse bg-dark" placeholder={inputPlaceholder}/>
                    </div>

                    {dropdowns.map((dropdown, index) => (
                        <div key={index} className="mb-3">
                            <select className="form-select bg-dark" onChange={index === 0 ? handleFormatChange : handleQualityChange}>
                                {dropdown.options.map((option, index) => (
                                    <option key={index}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-secondary">
                        {buttonName}
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Form;