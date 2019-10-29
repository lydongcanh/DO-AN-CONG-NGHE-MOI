const scoreTypes = [
    "Kiểm tra miệng",
    "15 phút",
    "1 tiết",
    "Giữa kỳ",
    "Cuối kỳ"
];

export default scoreTypes;

export function getMultiplierFromType(type) {
    if (type == scoreTypes[0] || type == scoreTypes[1])
        return 1;

    if (type == scoreTypes[2] || type == scoreTypes[3])
        return 2;

    if (type == scoreTypes[4])
        return 3;

    return 1;
}