import { IUser, User } from "@/entities/user";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserUseCaseRequest {
  id: string;
}

interface GetUserUseCaseResponse {
  user: IUser;
}

export async function getUser({
  id,
}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
  const user = await User.findById(id);

  if (!user) {
    throw new ResourceNotFoundError();
  }

  return { user };
}
