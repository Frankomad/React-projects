import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedremainingTime = (remainingTime / 1000).toFixed(2);

    const calculateScore = (targetTime, remainingTime) => {
        if (remainingTime > 0) {
            const exponent = 0.75;
            const baseScore = 10;
            return (baseScore * Math.pow((targetTime / (remainingTime / 1000)), exponent)).toFixed(2);
        } else {
            return 0;
        }
    };

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost ?
                <h2>You lost</h2> :
                <><h2>You won!</h2><h2>Your score is {calculateScore(targetTime, remainingTime)}</h2></>
            }

            <p>The target time was {" "}
                <strong>
                    {targetTime} second{targetTime === 1 ? "" : "s"}
                </strong>.
            </p>
            <p>
                You stopped the timer with <strong>{formattedremainingTime} seconds left</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )
}
)

export default ResultModal;