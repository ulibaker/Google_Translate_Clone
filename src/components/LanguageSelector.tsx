import { Form } from 'react-bootstrap'
import { SUPPORTED_LANGUAGES } from '../constants'
export const LanguageSelector = ({ onchange }) => {
    return (
        <Form.Select aria-label='Select the language:'>
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}