interface NavigationButtonsProps {
    goBack: () => void;
    goForward: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    goBack,
    goForward
}) => {
    return (
        <>
            <button onClick={goBack}>&lt; Back</button>
            <button onClick={goForward}>Next &gt;</button>
        </>
    );
};

export default NavigationButtons;
