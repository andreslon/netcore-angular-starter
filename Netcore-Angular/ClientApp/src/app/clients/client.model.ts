export interface ClientBaseModel {
  id: string;
  name: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
}
export interface ClientFullModel extends ClientBaseModel {
  //public List < ScopeFullDto > Scopes { get; set; }
  //public List < GrantTypeFullDto > GrantTypes { get; set; }
  //public List < SecretFullDto > Secrets { get; set; }  
}
