import { EntityRepository, getManager, Repository } from "typeorm";
import { Ad } from "./entity/ad.entity";
import { Favorite } from "./entity/favorite.entity";
import { RequestNote } from "./entity/request-note.entity";
import { Request } from "./entity/request.entity";

@EntityRepository(Ad)
export class AdAdRepository extends Repository<Ad> {
}

@EntityRepository(Request)
export class AdRequestRepository extends Repository<Request> {
}

@EntityRepository(RequestNote)
export class AdRequestNoteRepository extends Repository<RequestNote> {
}

@EntityRepository(Favorite)
export class AdFavoriteRepository extends Repository<Favorite> {
}