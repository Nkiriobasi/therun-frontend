import { useState } from "react";
import {
    MarathonEvent,
    SendMarathonDataButton,
} from "./send-marathon-data-button";
import { LiveRun } from "../live/live-user-run";

export const FreeInput = ({
    liveRun,
    sessionId,
}: {
    liveRun: LiveRun;
    sessionId: string;
}) => {
    const [input, setInput] = useState("");

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h2>Free Input</h2>
            <textarea
                style={{
                    background: "var(--color-tertiary)",
                    border: "none",
                    color: "var(--color-text)",
                    width: "100%",
                    height: "6rem",
                }}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />

            <SendMarathonDataButton
                description={"Send Free Input to ESA"}
                sessionId={sessionId}
                data={freeInputEvent(liveRun, input)}
                buttonText={"Send Free Input"}
            />
        </div>
    );
};

export const freeInputEvent = (
    liveRun: LiveRun,
    input: string
): MarathonEvent => {
    return {
        type: "free_input_event",
        name: "Free Input Event",
        description: "Contains free input to be shown on stream",
        time: new Date().toISOString(),
        game: liveRun.game,
        category: liveRun.category,
        username: liveRun.user,
        data: {
            input,
        },
    };
};
