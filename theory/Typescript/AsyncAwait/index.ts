
const getAsyncData1 = (parameter: number) =>
    new Promise<number>(r => {
        setTimeout(() => r(parameter * 2), 1000)
    });

const getAsyncData2 = (parameter: number) =>
    new Promise<number>(r => {
        setTimeout(() => r(parameter * 3), 1000)
    });

(async () => {
    const asyncData1 = await getAsyncData1(4);
    const asyncData2 = await getAsyncData2(asyncData1);
    console.log(asyncData2);
})();


