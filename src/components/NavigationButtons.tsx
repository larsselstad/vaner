import { Button } from '@aws-amplify/ui-react';

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
            <Button onClick={goBack}>&lt; Back</Button>
            <Button onClick={goForward}>Next &gt;</Button>
        </>
    );
};

export default NavigationButtons;
