import { faker } from "@faker-js/faker"
export const AllBooks = Array.from({ length: 100 },() =>({
    title: faker.book.title(),
    author: faker.book.author(),
    description: faker.lorem.paragraph(10),
    id: faker.string.uuid(),
    genre: faker.book.genre(),
}))