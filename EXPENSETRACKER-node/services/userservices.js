exports.getExpenses = (req, where) => {
    console.log("inside services");
    return req.user.getExpenses(where);
}