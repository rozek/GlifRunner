  import {
    throwError,
    ValueIsString, ValueIsPlainObject, ValueIsArray,
    allowStringMatching, expectStringMatching,
    expectPlainObject, expectListSatisfying, allowFunction
  } from "javascript-interface-library"

  export type GlifInputs = string[] | { [Key:string]:string }

/**** GlifRunner - runs a given Glif ****/

  export class GlifRunner {
    private _APIToken:string|undefined

  /**** constructor - allows to configure a specific Glif API token ****/

    public constructor (APIToken?:string) {
      allowStringMatching('Glif API Token',APIToken,/^[a-z0-9]{32}$/)
      this._APIToken = APIToken
    }

  /**** isRunning, abort - useful, if Glifs are running in the background ****/

    private _AbortController:AbortController|undefined

    public get isRunning ():boolean  { return (this._AbortController != null) }
    public set isRunning (_:boolean) { throwError('ReadOnlyProperty: cannot set "isRunning"') }

    public abort ():void {
      if (this._AbortController != null) {
        this._AbortController.abort()
        this._AbortController = undefined

        if (this._Callback != null) {
          this._Callback(new Error('aborted'),this)
          this._Callback = undefined
        }
      }
    }

  /**** Response - access Glif output whenever you want ****/

    private _Callback:Function|undefined
    private _Response:object|undefined

    public get Response ()  { return (this._Response == null ? undefined : structuredClone(this._Response)) }
    public set Response (_) { throwError('ReadOnlyProperty: cannot set "Response"') }

  /**** run - run a given Glif and grab its result ****/

    public async run (
      GlifId:string, InputValues?:GlifInputs, Callback?:Function
    ):Promise<object> {
      expectStringMatching('Glif Id',GlifId, /^[a-z0-9]{25}$/)

      switch (true) {
        case (InputValues == null):
          InputValues = []
          break
        case ValueIsArray(InputValues):
          expectListSatisfying('list of input values',InputValues,ValueIsString)
          break
        default:
          expectPlainObject('set of input values',InputValues)
          if (Object.values(InputValues as object).some((Value) => ! ValueIsString(Value))) throwError(
            'InvalidArgument: Glif input values must be strings'
          )
      }

      allowFunction('GlifRunner callback',Callback)
      this._Callback = Callback

    /**** look for a Glif API Token ****/

      const APIToken = this._APIToken || GlifRunner._APIToken
      if (APIToken == null) throwError('MissingArgument: no Glif API token given')

      if (this._AbortController != null) {
        this.abort()         // create multiple runners for concurrent Glif runs
      }

    /**** now actually run the Glif ****/

      this._AbortController = new AbortController()
        try {
          const Response = await fetch('https://simple-api.glif.app',{
            method:'POST',
            headers: {
              'Authorization':`Bearer ${APIToken}`,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              id:GlifId,
              inputs:(InputValues == null ? [] : structuredClone(InputValues)),
            }),
            signal:this._AbortController.signal
          })

          this._Response        = await Response.json()
          this._AbortController = undefined
        } catch (Signal) {
          this._AbortController = undefined
            if (Callback != null) { Callback(Signal,this) }
          throw Signal
        }

        if (Callback != null) { Callback(this._Response,this) }
      return this._Response as object             // no structured clone here...
    }             // ...as most users will not run their Glifs in the background

  /**** static APIToken - allows to configure a "global" API token ****/

    private static _APIToken:string|undefined

    public static get APIToken ():string|undefined {
      return GlifRunner._APIToken
    }

    public static set APIToken (APIToken:string|undefined) {
      allowStringMatching('Glif API Token',APIToken,/^[a-z0-9]{32}$/)
      GlifRunner._APIToken = APIToken
    }

  /**** static run - convenience method for simple GlifRunner invocations ****/

    public static async run (
      GlifId:string, InputValues:GlifInputs, Callback?:Function
    ):Promise<object> {
      const Runner = new GlifRunner()
      return await Runner.run(GlifId,InputValues,Callback)
    }
  }

