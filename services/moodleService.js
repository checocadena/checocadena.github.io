// Mock data for courses
const mockCourses = [
    {
        id: 1,
        fullname: "Cambio Climático y Emisiones",
        summary: "Comprende el impacto del cambio climático y estrategias para reducir emisiones corporativas.",
        progress: 65,
        timemodified: Date.now() / 1000,
        overviewfiles: [{
            fileurl: "https://public.readdy.ai/ai/img_res/46c00c65c023d1ccf46aa77251d75623.jpg"
        }]
    },
    {
        id: 2,
        fullname: "Gestión de Residuos",
        summary: "Aprende sobre la gestión eficiente de residuos y su impacto ambiental.",
        progress: 100,
        timemodified: (Date.now() / 1000) - 86400 * 2, // 2 days ago
        overviewfiles: [{
            fileurl: "https://public.readdy.ai/ai/img_res/default-course-image.jpg"
        }]
    },
    {
        id: 3,
        fullname: "Energías Renovables",
        summary: "Explora las diferentes fuentes de energía renovable y su implementación.",
        progress: 100,
        timemodified: (Date.now() / 1000) - 86400 * 7, // 7 days ago
        overviewfiles: [{
            fileurl: "https://public.readdy.ai/ai/img_res/default-course-image.jpg"
        }]
    }
];

// Mock service implementation
export const moodleService = {
    // Mock login function
    async login(username, password) {
        // In a real implementation, this would make an API call
        // For now, we just return a success response
        return {
            success: true,
            user: {
                id: 1,
                username: username,
                fullname: username
            }
        };
    },

    // Mock get user info function
    async getUserInfo() {
        const username = localStorage.getItem('username');
        if (!username) {
            throw new Error('User not logged in');
        }
        return {
            id: 1,
            username: username,
            fullname: username,
            profileimageurl: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=3176FF&color=fff`
        };
    },

    // Mock get user courses function
    async getUserCourses() {
        const username = localStorage.getItem('username');
        if (!username) {
            throw new Error('User not logged in');
        }
        return mockCourses;
    },

    // Mock get course content function
    async getCourseContent(courseId) {
        const username = localStorage.getItem('username');
        if (!username) {
            throw new Error('User not logged in');
        }
        const course = mockCourses.find(c => c.id === parseInt(courseId));
        if (!course) {
            throw new Error('Course not found');
        }
        return {
            ...course,
            modules: [
                {
                    id: 1,
                    name: "¿Qué es el cambio climático?",
                    completed: true
                },
                {
                    id: 2,
                    name: "¿Por qué está cambiando el clima?",
                    completed: false
                },
                {
                    id: 3,
                    name: "¿Qué pasa si no hacemos nada?",
                    completed: false
                }
            ]
        };
    }
}; 