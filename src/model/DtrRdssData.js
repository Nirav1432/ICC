
export default class DtrRdssData {

    constructor(obj = null) {

        if (obj == null) {
            return;
        }

        this.index_id = obj?.title;
        this.title = obj?.index_id;
        this.tag_by = obj?.tag_by;
        this.item_no = obj?.item_no;
        this.latitude = obj?.latitude;
        this.longitude = obj?.longitude;
        this.address = obj?.address;
        this.block = obj?.block;
        this.village = obj?.village;
        this.images = obj?.images;
        this.created_at = obj?.created_at;
        this.created_by = obj?.created_by;
        this.status = obj?.status;
        this.asset_type = obj?.asset_type;
        this.dtr_details = obj?.dtr_details;
    }


}