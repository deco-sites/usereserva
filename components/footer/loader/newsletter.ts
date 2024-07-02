import { AppContext } from "../../../apps/site.ts";
import { Props } from "../Footer.tsx";
import { EMAIL_REGEX } from "../../../sdk/regex.ts";

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const contentType = req.headers.get("Content-Type");

  if (contentType !== "application/x-www-form-urlencoded") { 
    return { newsletterSuccess: null, ...props, invalidEmail: null, invalidName: null};
  }

  const form = await req.formData(); 
  const email = form.get("email")?.toString(); 
  const name = form.get("name")?.toString()

  if (!name ) {
    return { newsletterSuccess: false, ...props, invalidEmail: false, invalidName: true};
  }
  
  if ((!email || !EMAIL_REGEX.test(email))) {
    return { newsletterSuccess: false, ...props, invalidEmail: true, invalidName: false};
  }

  try {
    await ctx.invoke.vtex.actions.newsletter.subscribe({ email });
    return { newsletterSuccess: true, ...props, invalidEmail: false, invalidName: false };
  } catch (_error) {
    return { newsletterSuccess: false, ...props, invalidEmail: false, invalidName: false };
  }
};
