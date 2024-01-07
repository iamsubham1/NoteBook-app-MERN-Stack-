export const getColors = (() => {
    const colors = ['#D7F8F2', '#DABBFA', '#92AEF7', '#FFF5E1', '#514983', '756AB6'];
    let index = 0;

    return () => {
        const color = colors[index];
        index = (index + 1) % colors.length;
        return color;
    };
})();

