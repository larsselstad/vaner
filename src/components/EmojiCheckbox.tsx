import './EmojiCheckbox.css';
import classNames from 'classnames';

interface Props {
    name: string;
    label: string;
    checked: boolean;
    onChange: () => void;
}

const EmojiCheckbox: React.FC<Props> = ({ name, label, checked, onChange }) => {
    return (
        <label
            className={classNames('checkbox-label', {
                'checkbox-label-checked': checked
            })}
        >
            <span className="checkbox-emoji">{label}</span>
            <input
                className="checkbox-input"
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
};

export default EmojiCheckbox;
