const express = require("express");
const router = express.Router();

const { isEmpty } = require("../../utils/validate");
const { verifyToken } = require("../../utils/jwt");

/**
 * @description Actualiza el token de la sesion
 */
router.post("/update", async (req, res) => {
  if (isEmpty(req.body.token)) {
    await req.destroySession();
    return res.status(400).end();
  }

  const tokenData = verifyToken(req.body.token);
  if (!tokenData || !tokenData.user) {
    await req.destroySession();
    return res.status(400).end();
  }
  req.setSession(
    {
      token: req.body.token,
      user: tokenData.user,
      exp: tokenData.exp,
    },
    false
  );
  res.status(200).end();
});

/**
 * @description Finaliza la sesion y redirecciona a Login
 */
router.get("/end", async (req, res) => {
  await req.destroySession();
  res.redirect("/login");
});

/**
 * @description Envia la sesion en formato JSON, esto en caso de pruebas
 */
router.get("/session", (req, res) => {
  res.json({
    session: req.session.serverSession || "No session",
  });
});

/**
 * @description Envia la pagina para comunicar la sesion del usuario al servidor y asi tener acceso a rutas privadas
 */
router.get("/check", (req) => {
  req.reactRender("/checkSession", {
    urlRedirect: req.query.path || "/",
  });
});

module.exports = router;
