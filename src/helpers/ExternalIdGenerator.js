class ExternalIdGenerator {
    static generateExternalId(){
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    }

}

export default ExternalIdGenerator;