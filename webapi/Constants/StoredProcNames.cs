namespace OlympicGame.Constants
{
    public static class StoredProcNames
    {
        /// <summary>
        /// procédure pour récupérer toutes les offres
        /// </summary>
        public const string GetAllOffres = "sp_GetAllOffres";

        /// <summary>
        /// procédure pour la création d'une nouvel offre
        /// </summary>
        public const string CreateOffre = "sp_CreateOffre";

        /// <summary>
        /// procédure pour la modification d'une offre
        /// </summary>
        public const string UpdateOffre = "sp_UpdateOffre";

        /// <summary>
        /// procédure pour la suppression d'une offre
        /// </summary>
        public const string DeleteOffre = "sp_DeleteOffre";

        /// <summary>
        /// procédure pour la récupération d'une offre
        /// </summary>
        public const string GetOffre = "sp_GetOffre";



        /// <summary>
        /// procédure pour la creation d'un utikisateur
        /// </summary>
        public const string CreateUser = "sp_CreateUser";

        /// <summary>
        /// procédure pour les utilisateurs
        /// </summary>
        public const string GetUsers = "sp_GetUsers";

        /// <summary>
        /// procédure pour enregistrer la commande
        /// </summary>
        public const string CreateCommand = "sp_CreateNewCommand";

        /// <summary>
        /// procédure pour récupérer l'historique des ventes
        /// </summary>
        public const string GetHistoCommand = "sp_GetHistoCommand";

        /// <summary>
        /// procédure pour la récupération d'un qrcode
        /// </summary>
        public const string GetQrCode = "sp_GetQrCode";
    }
}
