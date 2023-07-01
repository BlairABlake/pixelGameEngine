function clone(instance) {
    return Object.assign(
        Object.create(
        Object.getPrototypeOf(instance),
        ),
        JSON.parse(JSON.stringify(instance)),
    );
}

function randint(max) {
    return Math.floor(Math.random() * max);
}