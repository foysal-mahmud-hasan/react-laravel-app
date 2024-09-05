<?php

namespace App\Http\Controllers;
use App\Models\Contact;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function GetData(){
        // $contacts = Contact::get(); // Fetch all contacts
        $contacts = Contact::all(); // Fetch all contacts
        
        return response()->json(['data' => $contacts]); // Return a JSON response
    }
    public function Save(Request $request)
    {
        $request->validate([
            'name' => 'required|min:6|max:20',
            'mobile' => 'required|numeric',
        ]);
        $query = new Contact();
        $query->name = $request->name;
        $query->mobile = $request->mobile;
        $query->address = $request->address;
        $query->save();

    return response()->json(['message' => 'success']);
    }
    public function Edit($id) {
        $Contact = Contact::find($id);
        return response()->json(['data' => $Contact]);
    }
    public function Delete($id){
        $Contact = Contact::find($id);
        $Contact->delete();
        return response()->json('Success');
    }
    public function EditUpdate(Request $request){
        $request->validate([
            'name' => 'required',
            'mobile' => 'required',
            'address' => 'required',
        ]);
        $query = Contact::find($request->id);
        $query->name = $request->name;
        $query->mobile = $request->mobile;
        $query->address = $request->address;
        $query->save();
        return response()->json('Success');
    }
}
