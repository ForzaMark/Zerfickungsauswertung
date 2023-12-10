"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotDiscriminatedBy = exports.isDiscriminatedBy = void 0;
function isDiscriminatedBy(property, discriminator) {
    return function (value) {
        return value[property] === discriminator;
    };
}
exports.isDiscriminatedBy = isDiscriminatedBy;
function isNotDiscriminatedBy(property, discriminator) {
    return function (value) { return value[property] !== discriminator; };
}
exports.isNotDiscriminatedBy = isNotDiscriminatedBy;
