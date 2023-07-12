import Button from "../Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <Button type="back" onClick={(e) => {
            e.preventDefault();
            navigate(-1)
        }}>&larr; Back</Button>

    )
}

export default BackButton
