interface DropDown {
    options: string[];
}

interface Props {
    name: string;
    onSubmit: (link: string, mp4: boolean, quality: string) => void;
    inputName: string
    inputPlaceholder: string
    buttonName: string
    dropdowns: DropDown[]
}

function Form({name, onSubmit, inputName, inputPlaceholder, buttonName, dropdowns}: Props) {
    return (
        <div>
            <form>
                <fieldset className={"d-grid gap-2"}>
                    <legend>{name}</legend>
                    <div className="mb-3">
                        <label htmlFor="textInput" className="form-label">{inputName}</label>
                        <input type="text" id="textInput" className="form-control pulse" placeholder={inputPlaceholder}/>
                    </div>

                    {dropdowns.map((dropdown, index) => (
                        <div key={index} className="mb-3">
                            <select key={index} className="form-select">
                                {dropdown.options.map((option, index) => (
                                    <option key={index}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button onClick={() => onSubmit("", true, "")} type="submit" className="btn btn-success">{buttonName}</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Form;