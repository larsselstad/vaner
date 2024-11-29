interface Props {
    name: string;
    label: string;
    checked: boolean;
    onChange: () => void;
}

const EmojiCheckbox: React.FC<Props> = ({ name, label, checked, onChange }) => {
    return (
        <label>
            <span>{label}</span>
            <input
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
};

export default EmojiCheckbox;
