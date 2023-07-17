import { useState } from 'react';

const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onCloseModal = () => setIsVisible(false);
    const onOpenModal = () => setIsVisible(true);

    return {
        // state
        isVisible,

        // handle
        onCloseModal,
        onOpenModal,
    };
};

export default useModal;
