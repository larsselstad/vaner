interface Props {
    text: string;
    saving: boolean;
    savingText: string;
    saved: boolean;
    savedText: string;
}

const SaveButton: React.FC<Props> = ({
    text,
    saving,
    savingText,
    saved,
    savedText
}) => {
    return (
        <button type="submit">
            {saving ? savingText : saved ? savedText : text}
        </button>
    );
};

export default SaveButton;
