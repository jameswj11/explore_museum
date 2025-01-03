function saveArt(req, res, user) {
    console.log('save art from backend:', req.body, 'user:', user)
};

function deleteArt(req, res, user) {
    console.log('delete art');
};

export {saveArt, deleteArt}