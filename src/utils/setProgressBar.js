const slowSetProgress = async (stages, setProgress) => {
    for (let i = 0; i < stages.length; i++) {
        await new Promise((resolve) => {
            setTimeout(() => {
                setProgress(stages[i]);
                resolve();
            }, 100);
        });
    }
};

export default slowSetProgress