import classNames from 'classnames';

import './SaveButton.css';

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
        <button
            type="submit"
            className={classNames('button-save', {
                'button-saving': saving,
                'button-saved': !saving && saved
            })}
        >
            {saving ? savingText : saved ? savedText : text}
        </button>
    );
};

export default SaveButton;
