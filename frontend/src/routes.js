import { Main } from "./pages/Main"
import { Game } from "./pages/Game"

export const routes = [
    { path: '/', element: Main },
    { path: '/game/:id', element: Game }
]