export const salesData = [
    { month: 'Jan', missions: 9 },
    { month: 'Feb', missions: 9 },
    { month: 'Mar', missions: 16 },
    { month: 'Apr', missions: 15 },
    { month: 'May', missions: 11 },
    { month: 'Jun', missions: 9 },
    { month: 'Jul', missions: 6 },
    { month: 'Aug', missions: 3 },
    { month: 'Sep', missions: 3 },
    { month: 'Oct', missions: 6 },
    { month: 'Nov', missions: 3 },
    { month: 'Dec', missions: 5 }, // Estimated
];

export const userData = [
    // Admins
    { name: "Thomas Zabalo", title: "Administrateur", email: "thomas.zabalo@ynov.com", role: "Admin" },
    
    // Users
    { name: "Marie Dupont", title: "Client", email: "marie.dupont@example.com", role: "Membre" },
    { name: "Lucas Martin", title: "Client", email: "lucas.martin@example.com", role: "Membre" },
    { name: "Sofia Bernard", title: "Client", email: "sofia.bernard@example.com", role: "Membre" },
    { name: "Thomas Lefevre", title: "Client", email: "thomas.lefevre@example.com", role: "Membre" },
    { name: "Emma Roux", title: "Client", email: "emma.roux@example.com", role: "Membre" },
    { name: "Hugo Moreau", title: "Client", email: "hugo.moreau@example.com", role: "Membre" },
    { name: "Chloe Girard", title: "Client", email: "chloe.girard@example.com", role: "Membre" },
    { name: "Leo Fournier", title: "Client", email: "leo.fournier@example.com", role: "Membre" },
    { name: "Manon Mercier", title: "Client", email: "manon.mercier@example.com", role: "Membre" },
    { name: "Ethan Lambert", title: "Client", email: "ethan.lambert@example.com", role: "Membre" },
    { name: "Camille Blanc", title: "Client", email: "camille.blanc@example.com", role: "Membre" },
    { name: "Jade Muller", title: "Client", email: "jade.muller@example.com", role: "Membre" },
    { name: "Noah Faure", title: "Client", email: "noah.faure@example.com", role: "Membre" },
    { name: "Lina Gauthier", title: "Client", email: "lina.gauthier@example.com", role: "Membre" },
    { name: "Louis Chevalier", title: "Client", email: "louis.chevalier@example.com", role: "Membre" },

    // Prestataires
    { name: "Briques & Délires SARL", title: "Maçonnerie", email: "contact@briquesetdelires.com", role: "Membre" },
    { name: "Plâtre et Rires SAS", title: "Plâtrerie", email: "contact@platreetrires.com", role: "Membre" },
    { name: "Les Fous du Béton", title: "Béton", email: "contact@lesfousdubeton.com", role: "Membre" },
];

export const missionData = [
    {
        id: 1,
        name: "Étanchéité terrasse",
        author: "Marie Dupont",
        email: "marie.dupont@example.com",
        date: "2025-12-13",
        status: "En cours",
        description: "Étanchéité à refaire sur une terrasse accessible."
    },
    {
        id: 2,
        name: "Réfection toiture",
        author: "Lucas Martin",
        email: "lucas.martin@example.com",
        date: "2025-12-17",
        status: "Terminée",
        description: "Réfection d’une toiture ancienne avec tuiles cassées."
    },
    {
        id: 3,
        name: "Ravalement façade",
        author: "Lucas Martin",
        email: "lucas.martin@example.com",
        date: "2025-12-13",
        status: "En cours",
        description: "Ravalement de façade avec enduit isolant."
    },
    {
        id: 4,
        name: "Installation électrique",
        author: "Thomas Lefevre",
        email: "thomas.lefevre@example.com",
        date: "2025-12-17",
        status: "Terminée",
        description: "Installation électrique à remettre aux normes dans une maison de 1970."
    },
    {
        id: 5,
        name: "Fuite sous évier",
        author: "Emma Roux",
        email: "emma.roux@example.com",
        date: "2025-12-17",
        status: "En cours",
        description: "Fuite sous évier, besoin d’un plombier rapidement."
    },
    {
        id: 6,
        name: "Pose charpente bois",
        author: "Hugo Moreau",
        email: "hugo.moreau@example.com",
        date: "2025-12-17",
        status: "Terminée",
        description: "Pose d’une charpente bois pour extension de maison."
    },
    {
        id: 7,
        name: "Rénovation appartement",
        author: "Chloe Girard",
        email: "chloe.girard@example.com",
        date: "2025-12-17",
        status: "En cours",
        description: "Rénovation complète d’un appartement, besoin de plusieurs corps de métier."
    }
];

export const documents = [
    { id: 1, name: 'Facture_T0000146.pdf', size: '1.2 MB', date: '2025-01-05' },
    { id: 2, name: 'Devis_O0000013.pdf', size: '2.5 MB', date: '2025-12-13' },
    { id: 3, name: 'Contrat_P000000B.pdf', size: '3.8 MB', date: '2025-01-10' },
    { id: 4, name: 'Rapport_Technique.pdf', size: '950 KB', date: '2025-02-15' },
    { id: 5, name: 'Photos_Chantier.zip', size: '15.4 MB', date: '2025-03-20' },
];

export const dashboardStats = {
    totalProviders: 20,
    totalUsers: 16,
    totalMissions: 30,
    satisfactionRate: 98,
    totalAds: 12,
    accessibilityScore: 9.5
};
