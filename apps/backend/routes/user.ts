import { Router } from "express";
import { client } from "db/client";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { SigninSchema } from "../types";
import { sendEmail } from "../mail";

const router = Router();

router.post("/signin", async (req, res) => {
  console.log(req.body);

  const { success, data } = SigninSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Invaild Email!",
    });
    return;
  }

  const user = await client.user.upsert({
    create: {
      email: data.email,
      role: "User",
    },
    update: {},
    where: {
      email: data.email,
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.EMAIL_JWT_SECRET!
  );

  if (process.env.NODE_ENV === "production") {
    await sendEmail(
      data.email,
      `Login to Contest platform`,
      `Click this link to login ${process.env.FRONTEND_URL!}/user/signin/post/?token=${token}`
    );
  } else {
    console.log(
      `The link for ${data.email} to login http://localhost:3000/user/signin/post/?token=${token}`
    );
  }

  res.status(200).json({
    message:
      "We have emailed you the one time login link to you, Please check your email!",
  });
});

router.get("/signin/post", async (req, res) => {
  try {
    const token = req.query.token as string;
    console.log(token);

    const decoded = jwt.verify(
      token,
      process.env.EMAIL_JWT_SECRET!
    ) as JwtPayload;

    if (decoded.userId) {
      const user = await client.user.findFirst({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        res.json(411).json({
          message: "Incorrect token!",
        });
        return;
      }

      const token_user = jwt.sign(
        {
          userId: decoded.userId,
          role: user.role,
        },
        process.env.USER_JWT_SECRET!
      );
      res.status(200).json({
        message: "Signed in successfully!",
        token: token_user,
      });
    } else {
      res.json(411).json({
        message: "Incorrect token!",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: "Something went wrong.",
    });
    return;
  }
});

export default router;
